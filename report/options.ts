export interface ReportOptions<TOrderField> {
    /** The name of your application or your email address so Toggl
     * can get in touch in case you're doing something wrong. */
    readonly user_agent: string;
    /** The ID of the Workspace to report on. */
    readonly workspace_id: number;
    /** ISO 8601 date (YYYY-MM-DD).
     *
     * @default Six days before today. */
    readonly since?: string;
    /** ISO 8601 date (YYYY-MM-DD).
     *
     * @default Today, unless "since" is in the future or more than a
     * year ago, in which case six days after "since". */
    readonly until?: string;
    /** @default "both" */
    readonly billable?: "yes" | "no" | "both";
    /** List of Client IDs. Use "0" if you want to filter out Time
     * Entries without a Client. */
    readonly client_ids?: readonly number[];
    /** List of Project IDs. Use "0" if you want to filter out Time
     * Entries without a Project. */
    readonly project_ids?: readonly number[];
    /** List of User IDs. */
    readonly user_ids?: readonly number[];
    /** List of Group IDs. Filters specified User IDs to include only
     * members of the specified Groups. */
    readonly members_of_group_ids?: readonly number[];
    /** List of Group IDs. Includes Users who are members of the
     * specified Groups in addition to those specified by "user_ids". */
    readonly or_members_of_group_ids?: readonly number[];
    /** List of Tag IDs. Use "0" if you want to filter out Time Entries
     * without a Tag. */
    readonly tag_ids?: readonly number[];
    /** List of Task IDs. Use "0" if you want to filter out Time Entries
     * without a Task. */
    readonly task_ids?: readonly number[];
    /** List of Time Entry IDs. */
    readonly time_entry_ids?: readonly number[];
    /** Matches against Time Entry descriptions. */
    readonly description?: string;
    /** If false, filters out Time Entries which do not have a
     * description. */
    readonly without_description: boolean;
    readonly order_field?: TOrderField;
    readonly distinct_rates?: boolean;
    /** If true, rounds time according to Workspace settings. */
    readonly rounding?: boolean;
    /** Determines whether to display hours as a decimal number or with
     * minutes.
     *
     * @default "minutes" */
    readonly display_hours?: "decimal" | "minutes";
}
