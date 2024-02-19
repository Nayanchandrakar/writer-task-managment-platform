import { SubTopic, Topic } from "@prisma/client";

export type TopicWithSubTopics = Topic & {
  SubTopic: SubTopic[];
};
