import { z } from 'zod';
export const ActivitySchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  source: z.string(),
});
export type Activity = z.infer<typeof ActivitySchema>;
export const ActivityCreateSchema = ActivitySchema.omit({ id: true });
export type ActivityCreateParams = z.infer<typeof ActivityCreateSchema>;
export const ActivityUpdateSchema = ActivitySchema.omit({ id: true }).partial();
export type ActivityUpdateParams = z.infer<typeof ActivityUpdateSchema>;

export const TopicSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  activityCount: z.number(),
  progress: z.number(),
  activities: z.array(ActivitySchema),
});
export type Topic = z.infer<typeof TopicSchema>;
export const TopicCreateSchema = TopicSchema.omit({
  id: true,
  activityCount: true,
  progress: true,
});
export type TopicCreateParams = z.infer<typeof TopicCreateSchema>;
export const TopicUpdateSchema = TopicSchema.omit({ id: true }).partial();
export type TopicUpdateParams = z.infer<typeof TopicUpdateSchema>;

export const JourneySchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  shortDescription: z.string(),
  longDescription: z.string(),
  topicCount: z.number(),
  progress: z.number(),
  topics: z.array(TopicSchema),
});
export type Journey = z.infer<typeof JourneySchema>;
export const JourneyCreateSchema = JourneySchema.omit({
  id: true,
  topicCount: true,
  progress: true,
});
export type JourneyCreateParams = z.infer<typeof JourneyCreateSchema>;
export const JourneyUpdateSchema = JourneySchema.omit({ id: true }).partial();
export type JourneyUpdateParams = z.infer<typeof JourneyUpdateSchema>;
