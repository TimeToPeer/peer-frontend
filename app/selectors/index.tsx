export const getPostedComment = (comments: any, entryId: number, created_by: number) => {
    return comments && comments.find((item: any) => item.quest_entry_id === entryId && item.created_by === created_by);
}

export const getUser = (users: any, id: number) => {
    return users && users.find((item: any) => item.id === id);
}

export const getTeacherId = (users: any) => {
    return users && users.find((item: any) => item.type === 1).id;
}

export default {
    getPostedComment,
    getUser
}