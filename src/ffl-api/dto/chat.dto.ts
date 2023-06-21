export interface FFIssueGuestChatTokenDto {
  accessToken?: string;
  appUserId?: string;
  appUserName?: string;
  appUserProfileImgUrl: string;
}

export interface FFChatTokenDto {
  chatServerWebSocketUrl: string;
  chatToken: string;
  userId: string;
  userName?: string;
  avatarProfileUrl?: string;
}
