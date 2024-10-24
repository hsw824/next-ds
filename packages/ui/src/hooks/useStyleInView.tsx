import { RefObject, useLayoutEffect, useState } from 'react';
import { useViewportRect } from '../utils/viewportContext';

// body의 Rect를 가져오는것이기 때문에 height은 100%를 가지고 있어야 하
// wrapper의 경우는 width가 100%이면 안됨

type PositionKey = 'left' | 'right' | 'top' | 'bottom';
type Position = Partial<Record<PositionKey, string | number>>;
type Style = Partial<Record<'left' | 'right' | 'top' | 'bottom', number>>;

const useStyleInView = (
  wrapperRef: RefObject<HTMLElement>,
  targetRef: RefObject<HTMLElement>,
  position: Position,
  positionType: 'absolute' | 'relative' = 'relative',
) => {
  const viewportRect = useViewportRect();
  const [style, setStyle] = useState<Style>({});

  useLayoutEffect(() => {
    if (!wrapperRef.current || !targetRef.current) return;

    const wrapperRect = wrapperRef.current.getBoundingClientRect();
    const targetRect = targetRef.current.getBoundingClientRect();

    const verticalKey = wrapperRect.bottom + targetRect.height < viewportRect.height ? 'top' : 'bottom';

    const horizontalKey = wrapperRect.right + targetRect.width < viewportRect.width ? 'left' : 'right';

    if (positionType === 'absolute') {
      const absoluteTop = -viewportRect.top + wrapperRect.top;
      setStyle({
        [verticalKey]:
          verticalKey === 'top'
            ? absoluteTop + wrapperRect.height + +(position.top || 0)
            : viewportRect.height - absoluteTop + +(position.bottom || 0),
        [verticalKey === 'top' ? 'bottom' : 'top']: 'auto',
        [horizontalKey]:
          horizontalKey === 'left'
            ? wrapperRect.left - +(position.left || 0)
            : viewportRect.width - wrapperRect.right + +(position.right || 0),
        [horizontalKey === 'left' ? 'right' : 'left']: 'auto',
      });
    } else {
      setStyle({
        [verticalKey]: position[verticalKey] || 0,
        [verticalKey === 'top' ? 'bottom' : 'top']: 'auto',
        [horizontalKey]: position[horizontalKey] || 0,
        [horizontalKey === 'left' ? 'right' : 'left']: 'auto',
      });
    }
  }, [viewportRect, wrapperRef, targetRef, position]);

  return style;
};

export default useStyleInView;
