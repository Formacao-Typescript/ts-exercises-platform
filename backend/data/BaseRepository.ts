import { mongodb, zod } from '../deps.ts';
import { SerializableStatic } from '../domain/types.ts';
import { Serializable } from '../domain/types.ts';

export abstract class Repository<
  C extends zod.ZodSchema,
  S extends SerializableStatic<C>,
  I extends Serializable = InstanceType<S>,
> {
  private readonly collection;
  constructor(
    readonly db: mongodb.Database,
    readonly entity: S
  ) {
    this.collection = db.collection(this.entity.collectionName);
  }

  async findById(id: string): Promise<I | null> {
    const result = await this.collection.findOne({ id });
    if (result) {
    }
  }
}
