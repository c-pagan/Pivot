/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'

export type IssuesDocument = Document & {
  title: string
}

const issueSchema = new mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
    priority: { type: String },
    issue_type: { type: String },
    status: { type: String },
    assignee: { type: String },
    project: {type: String}

  },
  { timestamps: true }
)

export default mongoose.model<IssuesDocument>('Issue', issueSchema)
