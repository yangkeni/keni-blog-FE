import { useRecoilState } from 'recoil';
import { userState } from './atom';
import { useEffect } from 'react';

export const useCurUser = () => {
  const [curUser, setCurUser] = useRecoilState(userState);
  useEffect(() => {
    localStorage.setItem('curUser', JSON.stringify(curUser));
  }, [curUser]);
  return {
    curUser,
    setCurUser,
  };
};
