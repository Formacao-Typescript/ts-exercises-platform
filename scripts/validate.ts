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

function readExerciseMetadata(exercisesFolderPath: string): ExerciseMetadata[] {
  const metadataPath = path.join(exercisesFolderPath, 'metadata.json');
  const metadataContent = fs.readFileSync(metadataPath, 'utf-8');
  return JSON.parse(metadataContent);
}

function writeExerciseMetadata(
  exercisesFolderPath: string,
  metadata: ExerciseMetadata[]
): void {
  const metadataPath = path.join(exercisesFolderPath, 'metadata.json');
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

      return {
        id,
        name: frontmatterObj.name || '',
        description: frontmatterObj.description || '',
      };
    }

    // TODO: return error on this point
    return {
      id,
      name: '',
      description: '',
    };
  });

  const metadataPath = path.join(activityFolderPath, 'metadata.json');
  fs.writeFileSync(metadataPath, JSON.stringify(activityMetadata, null, 2));
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

      writeActivityMetadata(activityFolderPath);
    });

    writeTopicMetadata(topicFolderPath, topics);
  });

  writeExerciseMetadata(exercisesFolderPath, exerciseMetadata);
}

// Example usage
const exercisesFolderPath = '/path/to/exercises';
updateExerciseMetadata(exercisesFolderPath);
