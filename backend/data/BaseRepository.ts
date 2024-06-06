import { mongodb, zod } from '../deps.ts';
import { RepositoryError } from '../domain/errors/RepositoryError.ts';
import { Serializable, SerializableStatic } from '../domain/types.ts';

export abstract class Repository<
  CreationSchema extends zod.ZodSchema,
  StaticEntity extends SerializableStatic<CreationSchema>,
  EntityInstance extends Serializable = ReturnType<StaticEntity['create']>,
> {
  protected readonly collection;
  constructor(
    protected readonly db: mongodb.Database,
    protected readonly entity: StaticEntity
  ) {
    this.collection = db.collection(entity.collectionName);
  }

  async findById(id: string): Promise<EntityInstance | null> {
    const result = await this.collection.findOne({ id });
    if (result) {
      return this.entity.create(result) as EntityInstance;
    }
    return null;
  }

  async search(query: Record<string, unknown>): Promise<EntityInstance[]> {
    const result = await this.collection.find(query).toArray();
    return result.map(
      (data: StaticEntity['creationSchema']['_output']) =>
        this.entity.create(data) as EntityInstance
    );
  }

  async list(): Promise<EntityInstance[]> {
    const result = await this.collection.find().toArray();
    return result.map(
      (data: StaticEntity['creationSchema']['_output']) =>
        this.entity.create(data) as EntityInstance
    );
  }

  async save(entity: EntityInstance): Promise<this> {
    const result = await this.collection.updateOne(
      { id: entity.id },
      { $set: entity.toObject() },
      { upsert: true }
    );

    if (result.modifiedCount === 0) {
      throw new RepositoryError({
        message: 'Failed to save entity',
        extraData: entity.toObject(),
        code: 'REPOSITORY_SAVE_ERROR',
      });
    }

    return this;
  }

  async delete(entity: EntityInstance): Promise<boolean> {
    return (await this.collection.deleteOne({ id: entity.id })) > 0;
  }
}
