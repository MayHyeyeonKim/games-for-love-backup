export const OPEN_MARKER_COLOR = "#92C65E"; // 초록색 (열림)
export const CLOSED_MARKER_COLOR = "#DB5757"; // 빨간색 (닫힘)
export const SELECTED_MARKER_COLOR = "#FFFF00"; // 노란색 (선택됨)
export const SELECTED_BACKGROUD_COLOR = "#F0F5FA"; // 선택된 병원의 배경색
export const HIGHLIGHT_BACKGROUD_COLOR = "#FFFCD8"; // 강조된 요소의 배경색
export const BORDER_COLOR = "#d9d9d9"; // 경계선 색상

export const getStatusColor = (
  status: "selected" | "past" | "active" | undefined
) => {
  switch (status) {
    case "selected":
      return SELECTED_MARKER_COLOR; // 선택된 병원일 경우 노란색
    case "past":
      return CLOSED_MARKER_COLOR; // 과거 상태의 병원일 경우 빨간색
    case "active":
    default:
      return OPEN_MARKER_COLOR; // 활성 상태일 경우 초록색
  }
};
