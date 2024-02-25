import { ActivityLog, SubTopic, Topic } from "@prisma/client";

export type TopicWithSubTopics = Topic & {
  SubTopic: SubTopic[];
};

export type AuditLogCustom = ActivityLog & {
  firstName: string;
  lastName: string;
  imageUrl: string;
};
