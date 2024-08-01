export type UserRole = 'admin' | 'moderator' | 'user' ;

export interface RolePermissions {
    canCreatePost: boolean;
    canEditPost: boolean;
    canDeletePost: boolean;
    canCreateComment: boolean;
    canEditComment: boolean;
    canDeleteComment: boolean;
    canBanUser: boolean;
    canViewContent: boolean;
}

export const rolePermissions: Record<UserRole, RolePermissions> = {
    admin: {
        canCreatePost: true,
        canEditPost: true,
        canDeletePost: true,
        canCreateComment: true,
        canEditComment: true,
        canDeleteComment: true,
        canBanUser: true,
        canViewContent: true,
    },
    moderator: {
        canCreatePost: true,
        canEditPost: true,
        canDeletePost: true,
        canCreateComment: true,
        canEditComment: true,
        canDeleteComment: true,
        canBanUser: false,
        canViewContent: true,
    },
    user: {
        canCreatePost: false,
        canEditPost: false,
        canDeletePost: false,
        canCreateComment: true,
        canEditComment: false,
        canDeleteComment: false,
        canBanUser: false,
        canViewContent: true,
    },
};