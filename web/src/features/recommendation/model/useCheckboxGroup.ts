/**
 * @description 체크박스 그룹 관리 hook
 * @template T 체크박스 그룹의 아이템 타입
 * @param initialItems 초기 체크된 아이템들
 * @param idKey 아이템의 고유 식별자로 사용할 키 값
 * @return {UseCheckboxGroupReturn<T>} 체크박스 그룹 관리에 필요한 상태, 메서드들
 *
 * @example
 *   const {
 *     checkedItems,    // 선택된 아이템들의 Set
 *     isChecked,       // 개별 아이템 선택 여부 확인
 *     isAllChecked,    // 전체 선택 여부
 *     toggleItem,      // 개별 아이템 선택/해제
 *     toggleAll,       // 전체 아이템 선택/해제
 *     getCheckedItems  // 선택된 아이템 목록 조회
 *   } = useCheckboxGroup<Item>([], 'carId');
 */

import { useState, useCallback } from "react";

export interface UseCheckboxGroupReturn<T> {
  checkedItems: Set<T[keyof T]>;
  isChecked: (itemId: T[keyof T]) => boolean;
  toggleItem: (itemId: T[keyof T]) => void;
  toggleAll: (items: T[]) => void;
  isAllChecked: (items: T[]) => boolean;
  getCheckedItems: (items: T[]) => T[];
}

export const useCheckboxGroup = <T>(
  initialItems: T[] = [],
  idKey: keyof T
): UseCheckboxGroupReturn<T> => {
  const [checkedItems, setCheckedItems] = useState<Set<T[keyof T]>>( // number
    () => new Set(initialItems.map((item) => item[idKey]))
  );

  /**
   * isAllChecked
   */
  const isAllChecked = useCallback(
    (items: T[]): boolean => {
      return (
        items.length > 0 && items.every((item) => checkedItems.has(item[idKey]))
      );
    },
    [checkedItems, idKey]
  );

  /**
   * toggleItem
   */
  const toggleItem = useCallback((itemId: T[keyof T]): void => {
    setCheckedItems((prev) => {
      const next = new Set(prev);

      if (next.has(itemId)) {
        next.delete(itemId);
      } else {
        next.add(itemId);
      }
      return next;
    });
  }, []);

  /**
   * toggleAll
   */
  const toggleAll = useCallback(
    (items: T[]): void => {
      setCheckedItems(() => {
        if (isAllChecked(items)) {
          return new Set(); // 모든 체크 해제
        } else {
          return new Set(items.map((item) => item[idKey])); // 모든 항목 체크
        }
      });
    },
    [isAllChecked, idKey]
  );

  /**
   * isChecked
   */
  const isChecked = useCallback(
    (itemId: T[keyof T]): boolean => {
      return checkedItems.has(itemId);
    },
    [checkedItems]
  );

  /**
   * getCheckedItems
   */
  const getCheckedItems = useCallback(
    (items: T[]): T[] => {
      return items.filter((item) => checkedItems.has(item[idKey]));
    },
    [checkedItems, idKey]
  );

  return {
    checkedItems,
    isChecked,
    toggleItem,
    toggleAll,
    isAllChecked,
    getCheckedItems,
  };
};
