export interface ReportInput {
    reviewId: string;
    type: ReportType;
    description: string;
}

export interface Report extends ReportInput {
    id: string;
}

export enum ReportType {
    INAPPROPRIATE = "INAPPROPRIATE",
    UNHELPFUL = "UNHELPFUL",
    INACCURATE = "INACCURATE",
    OTHER = "OTHER"
}