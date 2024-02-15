import * as fs from 'fs';
import * as path from 'path';
import createDebug from 'debug';
import matter from 'gray-matter';

import {
  IActivity,
  IJourney,
  IRawJourney,
  IRawTopic,
  ITopic,
} from '../src/types';

class UsageError extends Error {}

const debug = createDebug('ts-exercises:validate');

const utils = {
  readMetadata: <T = any>(folderPath: string): T => {
    const metadataPath = path.join(folderPath, 'metadata.json');
    const metadataContent = fs.readFileSync(metadataPath, 'utf-8');
    return JSON.parse(metadataContent);
  },
  writeMetadata: (folderPath: string, metadata: any) => {
    const metadataPath = path.join(folderPath, 'metadata.json');
    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
  },
  readMarkdownGroup: (folderPath: string): string[] => {
    return fs
      .readdirSync(folderPath)
      .filter(file => file.endsWith('.md') && file !== 'INFO.md');
  },
  readOnlyFolders: (folderPath: string): string[] => {
    return fs
      .readdirSync(folderPath)
      .filter(file => file.split('.').length === 1);
  },
  extractFrontMatter: <T = Record<string, any>>(
    filePath: string,
    keys: string[]
  ): T => {
    const activityContent = fs.readFileSync(filePath, 'utf-8');
    const { data: frontmatterObj } = matter(activityContent);

    keys.forEach(key => {
      if (!frontmatterObj[key]) {
        throw new UsageError(
          `Activity file '${filePath}' is missing '${key}' in frontmatter.`
        );
      }
    });

    return frontmatterObj as T;
  },
};

const handlers = {
  journey: {
    read: (folderPath: string): IRawJourney[] => {
      const journeyFolders = utils.readOnlyFolders(folderPath);
      return journeyFolders.map(folder => {
        const id = path.parse(folder).name;
        const infoFilePath = path.join(folderPath, folder, 'INFO.md');
        const data = utils.extractFrontMatter<Partial<IRawJourney>>(
          infoFilePath,
          ['name', 'shortDescription', 'longDescription']
        );
        return { id, topicCount: 0, ...data } as IRawJourney;
      });
    },
    write: (folderPath: string, journeys: IJourney[]) => {
      const dataToWrite: IRawJourney[] = journeys.map(journey => ({
        id: journey.id,
        name: journey.name,
        shortDescription: journey.shortDescription,
        longDescription: journey.longDescription,
        topicCount: journey.topicCount,
      }));

      utils.writeMetadata(folderPath, dataToWrite);
    },
    validate: (journeys: Partial<IRawJourney>[]) => {
      if (!Array.isArray(journeys) || journeys.length === 0) {
        throw new UsageError('You must provide at least one journey');
      }
    },
  },
  topic: {
    read: (folderPath: string): IRawTopic[] => {
      const topicFolders = utils.readOnlyFolders(folderPath);
      return topicFolders.map(folder => {
        const id = path.parse(folder).name;
        const infoFilePath = path.join(folderPath, folder, 'INFO.md');
        const data = utils.extractFrontMatter<Partial<IRawTopic>>(
          infoFilePath,
          ['name', 'description']
        );
        return { id, activityCount: 0, ...data } as IRawTopic;
      });
    },
    write: (folderPath: string, topics: ITopic[]) => {
      const dataToWrite: IRawTopic[] = topics.map(topic => ({
        id: topic.id,
        name: topic.name,
        description: topic.description,
        activityCount: topic.activityCount,
      }));
      utils.writeMetadata(folderPath, dataToWrite);
    },
    validate: (topics: IRawTopic[]) => {
      if (!Array.isArray(topics) || topics.length === 0) {
        throw new UsageError('Each journey must have at least one topic');
      }
    },
  },
  activity: {
    read: (folderPath: string): IActivity[] => {
      const activityFiles = utils.readMarkdownGroup(folderPath);
      return activityFiles.map(file => {
        const id = path.parse(file).name;
        const activityFilePath = path.join(folderPath, file);
        const data = utils.extractFrontMatter(activityFilePath, [
          'name',
          'description',
        ]);
        return { id, ...data } as IActivity;
      });
    },
    write: (folderPath: string, activities: IActivity[]) => {
      utils.writeMetadata(folderPath, activities);
    },
    validate: (activities: IActivity[]) => {
      if (!Array.isArray(activities) || activities.length === 0) {
        throw new UsageError('Each topic must have at least one activity');
      }
    },
  },
};

function updateExercisesMetadata(exercisesFolderPath: string): void {
  debug(`updateExercisesMetadata for folder: ${exercisesFolderPath}`);

  try {
    // --- READING AND VALIDATING ---
    const journeys: Partial<IJourney>[] =
      handlers.journey.read(exercisesFolderPath);
    handlers.journey.validate(journeys);
    debug('Successfully read journeys');

    journeys.forEach(journey => {
      const topicsFolderPath = path.join(exercisesFolderPath, journey.id!);
      const topics = handlers.topic.read(topicsFolderPath) as ITopic[];
      handlers.topic.validate(topics);
      debug('Successfully read topics');

      journey.topicCount = topics.length;
      journey.topics = topics;

      journey.topics.forEach(topic => {
        const activityFolderPath = path.join(topicsFolderPath, topic.id);

        const activities = handlers.activity.read(activityFolderPath);
        handlers.activity.validate(activities);

        topic.activityCount = activities.length;
        topic.activities = activities;

        debug('Successfully read activities');
      });
    });

    // --- WRITING ---
    journeys.forEach(journey => {
      journey.topics!.forEach(topic => {
        const activityFolderPath = path.join(
          exercisesFolderPath,
          journey.id!,
          topic.id
        );

        handlers.activity.write(activityFolderPath, topic.activities);
      });
      debug('Successfully wrote activities');

      handlers.topic.write(
        path.join(exercisesFolderPath, journey.id!),
        journey.topics!
      );
    });
    debug('Successfully wrote topics');

    handlers.journey.write(exercisesFolderPath, journeys as IJourney[]);
    debug('Successfully wrote journeys');
  } catch (error) {
    if (error instanceof UsageError) {
      console.error('ATTENTION: ', error.message);
      process.exit(1);
    }
    console.error('Unexpected error.', error);
    process.exit(1);
  }
}

const exercisesFolderPath = path.resolve('exercises');
updateExercisesMetadata(exercisesFolderPath);
