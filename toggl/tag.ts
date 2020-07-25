import {AuthenticatedApiClient} from "./authentication";
import {request, Response} from "./request-response";

export interface Tag extends CreateTagOptions, UpdateTagOptions {}

export interface CreateTagOptions extends UpdateTagOptions {
    /** The Workspace ID of the Workspace that contains the Tag. */
    readonly wid: number;
}

export interface UpdateTagOptions {
    /** Tag ID. */
    readonly id: number;
    /** The name of the tag. Must be unique in Workspace. */
    readonly name: string;
}

export async function createTag(
    client: AuthenticatedApiClient,
    tag: CreateTagOptions
): Promise<Response<Tag>> {
    return request(client, {
        method: "POST",
        path: "tags",
        body: {tag}
    }).then(response => response as Response<Tag>);
}

export async function updateTag(
    client: AuthenticatedApiClient,
    tag: UpdateTagOptions
): Promise<Response<Tag>> {
    return request(client, {
        method: "PUT",
        path: `tags/${tag.id}`,
        body: {tag: {name: tag.name}}
    }).then(response => response as Response<Tag>);
}

export async function deleteTag(
    client: AuthenticatedApiClient,
    tagId: number
): Promise<Response<object>> {
    return request(client, {
        method: "DELETE",
        path: `tags/${tagId}`
    }).then(response => response as Response<object>);
}
