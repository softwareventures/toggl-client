import {AuthenticatedApiClient} from "./authentication";
import {request, Response} from "./request-response";

export interface Tag extends CreateTagOptions {
    /** Tag ID. */
    readonly id: number;
}

export interface CreateTagOptions {
    /** The name of the tag. Must be unique in Workspace. */
    readonly name: string;
    /** The Workspace ID of the Workspace that contains the Tag. */
    readonly wid: number;
}

export async function createTag(client: AuthenticatedApiClient, tag: Tag): Promise<Response<Tag>> {
    return request(client, {
        method: "POST",
        path: "tags",
        body: {tag}
    }).then(response => response as Response<Tag>);
}
