import * as fs from 'fs';
import * as path from 'path';

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

function readExerciseMetadata(exerciseFolderPath: string): ExerciseMetadata[] {
  const metadataPath = path.join(exerciseFolderPath, 'metadata.json');
  const metadataContent = fs.readFileSync(metadataPath, 'utf-8');
  return JSON.parse(metadataContent);
}

function writeExerciseMetadata(
  exerciseFolderPath: string,
  metadata: ExerciseMetadata[]
): void {
  const metadataPath = path.join(exerciseFolderPath, 'metadata.json');
  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
}

function readTopicMetadata(topicFolderPath: string): TopicMetadata[] {
  const metadataPath = path.join(topicFolderPath, 'metadata.json');
  const metadataContent = fs.readFileSync(metadataPath, 'utf-8');
  return JSON.parse(metadataContent);
}

function writeTopicMetadata(
  topicFolderPath: string,
  metadata: TopicMetadata[]
): void {
  const metadataPath = path.join(topicFolderPath, 'metadata.json');
  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
}

function readActivityMetadata(activityFolderPath: string): ActivityMetadata[] {
  const metadataPath = path.join(activityFolderPath, 'metadata.json');
  const metadataContent = fs.readFileSync(metadataPath, 'utf-8');
  return JSON.parse(metadataContent);
}

function writeActivityMetadata(
  activityFolderPath: string,
  metadata: ActivityMetadata[]
): void {
  const metadataPath = path.join(activityFolderPath, 'metadata.json');
  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
}

function updateExerciseMetadata(exercisesFolderPath: string): void {
  const exerciseMetadata = readExerciseMetadata(exercisesFolderPath);

  exerciseMetadata.forEach(exercise => {
    const topicFolderPath = path.join(
      exercisesFolderPath,
      exercise.id,
      'topic'
    );
    const topics = readTopicMetadata(topicFolderPath);

    exercise.topicCount = topics.length;

    topics.forEach(topic => {
      const activityFolderPath = path.join(
        topicFolderPath,
        topic.id,
        'activity'
      );
      const activityCount = fs
        .readdirSync(activityFolderPath)
        .filter(file => file.endsWith('.md')).length;

      topic.activityCount = activityCount;

      const activities = readActivityMetadata(activityFolderPath);

      const updatedActivities = activities.map(activity => {
        const activityFilePath = path.join(
          activityFolderPath,
          `${activity.id}.md`
        );
        const activityContent = fs.readFileSync(activityFilePath, 'utf-8');
        const frontmatterMatch = activityContent.match(/^---([\s\S]*?)---/);

        if (frontmatterMatch) {
          const frontmatter = frontmatterMatch[1];
          const frontmatterObj = JSON.parse(`{${frontmatter}}`);

          return {
            id: activity.id,
            name: frontmatterObj.name || '',
            description: frontmatterObj.description || '',
          };
        }

        return activity;
      });

      writeActivityMetadata(activityFolderPath, updatedActivities);
    });

    writeTopicMetadata(topicFolderPath, topics);
  });

  writeExerciseMetadata(exercisesFolderPath, exerciseMetadata);
}

// Example usage
const exercisesFolderPath = '/path/to/exercises';
updateExerciseMetadata(exercisesFolderPath);
