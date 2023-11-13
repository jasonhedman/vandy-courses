export interface ReportInput {
    userId: string;
    reviewId: string;
    type: ReportType;
    description: string;
}

export interface Report extends ReportInput {
    id: string;
}

export enum ReportType {
    INAPPROPRIATE = "Inappropriate",
    UNHELPFUL = "Unhelpful",
    INACCURATE = "Inaccurate",
    OTHER = "Other"
}