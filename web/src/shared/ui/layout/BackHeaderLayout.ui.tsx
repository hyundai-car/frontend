/**
 * @description header(로고, 검색 버튼)이 있는 레이아웃
 */

import { Outlet } from "react-router-dom";

export function BackHeaderLayout() {
  return (
    <div>
      BackHeaderLayout.ui
      <Outlet />
    </div>
  );
}
