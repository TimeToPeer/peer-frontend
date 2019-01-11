export const getPostedComment = (comments: any, entryId: number, created_by: number) => {
    return comments && comments.find((item: any) => item.quest_entry_id === entryId && item.created_by === created_by);
}

export default {
    getPostedComment
}