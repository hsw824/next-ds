## 디자인 시스템 + 홍챠 클론
### 프로젝트 설명
#### 디자인 시스템
**기술 스택**
- **주요 라이브러리:** React, TypeScript
- **빌드 및 개발 도구:** Vite, Storybook
**설명**
- Radix.ui의 개발 컨셉을 참고하여 Tab, Accordion, Form, Overlay, Carousel, Infinity Scroll 컴포넌트를 구현
- CommonJS와 ES 모듈을 모두 지원
- Radix.ui에서 제공하는 Render Delegation, Slot, Slottable, Primitive 컴포넌트 개념을 적용하여 유연한 컴포넌트를 구현

  ---
  ### 홍챠
  **사용 기술 스택**
- **주요 프레임워크, 라이브러리:** Next.js 14, React 18, TypeScript 5
- **상태 관리 라이브러리:** TanStack Query
- **스타일링 라이브러리**: Tailwind CSS

  **설명**
- 사이드 프로젝트로 진행한 디자인 시스템에 모노레포를 적용하여 왓챠 클론 진행
- pnpm을 활용한 모노레포 구조를 도입하여 디자인시스템, Storybook, UI 컴포넌트를 효율적으로 구성하고 필요한 의존성만을 선택적으로 사용하는 최적화된 아키텍처 적용
- Next.js를 도입하여 SSR을 지원함으로써 초기 로딩 속도를 개선하고 SEO 최적화를 구현
