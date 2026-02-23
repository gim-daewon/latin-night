export interface KakaoUser {
  id: string;
  nickname: string;
  profileImage: string;
}

declare global {
  interface Window {
    Kakao: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Auth: {
        login: (options: { success: () => void; fail: (err: unknown) => void }) => void;
        logout: (callback?: () => void) => void;
      };
      API: {
        request: (options: {
          url: string;
          success: (res: KakaoMeResponse) => void;
          fail: (err: unknown) => void;
        }) => void;
      };
    };
  }
}

interface KakaoMeResponse {
  id: number;
  kakao_account?: {
    profile?: {
      nickname?: string;
      profile_image_url?: string;
    };
  };
}

export function initKakao() {
  const key = import.meta.env.VITE_KAKAO_JS_KEY;
  if (!key || !window.Kakao) return;
  if (!window.Kakao.isInitialized()) {
    window.Kakao.init(key);
  }
}

export function kakaoLogin(): Promise<KakaoUser> {
  return new Promise((resolve, reject) => {
    if (!window.Kakao?.Auth) {
      reject(new Error('카카오 SDK가 로드되지 않았습니다. VITE_KAKAO_JS_KEY를 확인해주세요.'));
      return;
    }
    window.Kakao.Auth.login({
      success: () => {
        window.Kakao.API.request({
          url: '/v2/user/me',
          success: (res) => {
            resolve({
              id: String(res.id),
              nickname: res.kakao_account?.profile?.nickname ?? '사용자',
              profileImage: res.kakao_account?.profile?.profile_image_url ?? '',
            });
          },
          fail: reject,
        });
      },
      fail: reject,
    });
  });
}

export function kakaoLogout(): Promise<void> {
  return new Promise((resolve) => {
    if (!window.Kakao?.Auth) { resolve(); return; }
    window.Kakao.Auth.logout(() => resolve());
  });
}
