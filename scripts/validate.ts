import * as fs from 'fs';
import * as path from 'path';
import createDebug from 'debug';

class UsageError extends Error {}

import {
  IActivity,
  IJourney,
  IRawJourney,
  IRawTopic,
  ITopic,
} from '../src/types';

const debug = createDebug('ts-exercises:validate');

const shared: {
  journeys: Partial<IJourney>[];
} = {
  journeys: [],
};

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
    return fs.readdirSync(folderPath).filter(file => file.endsWith('.md'));
  },
  readOnlyFolders: (folderPath: string): string[] => {
    return fs
      .readdirSync(folderPath)
      .filter(file => file.split('.').length === 1);
  },
  extractFrontMatter: (filePath: string, keys: string[]) => {
    const activityContent = fs.readFileSync(filePath, 'utf-8');
    const frontmatterMatch = activityContent.match(/^---([\s\S]*?)---/);

    if (!frontmatterMatch) {
      throw new UsageError(
        `Activity file '${filePath}' is missing frontmatter.`
      );
    }
    const frontmatter = frontmatterMatch[1];
    const frontmatterObj = JSON.parse(`{${frontmatter}}`);

    // Developer note: not using reduce with spread operator here, too many iterations already
    let finalObj = {};

    keys.forEach(key => {
      if (!frontmatterObj[key]) {
        throw new UsageError(
          `Activity file '${filePath}' is missing '${key}' in frontmatter.`
        );
      }
      finalObj[key] = frontmatterObj[key];
    });

    return finalObj;
  },
};

const handlers = {
  journey: {
    read: (folderPath: string) => {
      return utils.readMetadata<IRawJourney[]>(folderPath);
    },
    write: () => {},
    validate: (journeys: Partial<IRawJourney>[]) => {
      if (!Array.isArray(journeys)) {
        throw new Error('Invalid metadata format');
      }
    },
  },
  topic: {
    read: (folderPath: string) => {
      return utils.readMetadata<IRawTopic[]>(folderPath);
    },
    write: () => {},
    validate: (topics: IRawTopic[]) => {
      if (!Array.isArray(topics)) {
        throw new Error('Invalid metadata format');
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
    write: () => {},
    validate: (activities: IActivity[]) => {
      if (!Array.isArray(activities)) {
        throw new Error('Invalid metadata format');
      }
    },
  },
};
interface ExerciseMetadata {
  id: string;
  topicCount: number;
}

interface TopicMetadata {
  id: string;
  activityCount: number;
}

interface ActivityMetadata {
  id: string;
  name: string;
  description: string;
}

function writeActivityMetadata(activityFolderPath: string): void {
  const activityFiles = fs
    .readdirSync(activityFolderPath)
    .filter(file => file.endsWith('.md'));

  const activityMetadata: ActivityMetadata[] = activityFiles.map(file => {
    const id = path.parse(file).name;

    const activityFilePath = path.join(activityFolderPath, file);
    const activityContent = fs.readFileSync(activityFilePath, 'utf-8');
    const frontmatterMatch = activityContent.match(/^---([\s\S]*?)---/);

    if (frontmatterMatch) {
      const frontmatter = frontmatterMatch[1];
      const frontmatterObj = JSON.parse(`{${frontmatter}}`);

      if (!frontmatterObj.name || !frontmatterObj.description) {
        throw new Error(
          `Activity file '${file}' is missing 'name' and/or 'description' in frontmatter.`
        );
      }

      return {
        id,
        name: frontmatterObj.name,
        description: frontmatterObj.description,
      };
    }

    throw new Error(`Activity file '${file}' is missing frontmatter.`);
  });

  const metadataPath = path.join(activityFolderPath, 'metadata.json');
  fs.writeFileSync(metadataPath, JSON.stringify(activityMetadata, null, 2));
}

function updateExercisesMetadata(exercisesFolderPath: string): void {
  debug(`updateExercisesMetadata for folder: ${exercisesFolderPath}`);

  try {
    shared.journeys = handlers.journey.read(exercisesFolderPath);
    handlers.journey.validate(shared.journeys);

    debug(`Journeys: ${JSON.stringify(shared.journeys, null, 2)}`);
    shared.journeys.forEach(journey => {
      const topicsFolderPath = path.join(exercisesFolderPath, journey.id!);
      const topics = handlers.topic.read(topicsFolderPath) as ITopic[];
      handlers.topic.validate(topics);
      debug(`Topics: ${JSON.stringify(topics, null, 2)}`);

      journey.topicCount = topics.length;
      journey.topics = topics;

      journey.topics.forEach(topic => {
        const activityFolderPath = path.join(topicsFolderPath, topic.id);

        const activities = handlers.activity.read(activityFolderPath);
        handlers.activity.validate(activities);

        topic.activityCount = activities.length;
        topic.activities = activities;

        console.log('activities', JSON.stringify(activities, null, 2));
        //   try {
        //     writeActivityMetadata(activityFolderPath);
        //   } catch (error) {
        //     debug(`Error writing activity metadata: ${error.message}`);
        //     // Handle the error or log additional information if needed
        //   }
      });
    });
  } catch (error) {
    if (error instanceof UsageError) {
      console.error('ATTENTION: ', error.message);
      process.exit(1);
    }
    debug(`Error reading exercise metadata: ${error.message}`);
    console.error('Unexpected error.', error);
    process.exit(1);
  }

  // topics.forEach(topic => {
  //   debug(`Processing topic with id: ${topic.id}`);

  //   const activityFolderPath = path.join(
  //     topicFolderPath,
  //     topic.id,
  //     'activity'
  //   );
  //   const activityCount = fs
  //     .readdirSync(activityFolderPath)
  //     .filter(file => file.endsWith('.md')).length;

  //   topic.activityCount = activityCount;

  //   try {
  //     writeActivityMetadata(activityFolderPath);
  //   } catch (error) {
  //     debug(`Error writing activity metadata: ${error.message}`);
  //     // Handle the error or log additional information if needed
  //   }
  // });

  //   writeTopicMetadata(topicFolderPath, topics);

  // writeExerciseMetadata(exercisesFolderPath, exerciseMetadata);
}

const exercisesFolderPath = path.resolve('exercises-script-test');
updateExercisesMetadata(exercisesFolderPath);
