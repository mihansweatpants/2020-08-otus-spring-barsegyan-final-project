export interface SessionDto {
  id: string;
  expired: boolean;
  lastAccessedTime: string;
  details: SessionDetailsDto | null;
}

export interface SessionDetailsDto {
  remoteAddr: string;
  userAgent: string;
}
