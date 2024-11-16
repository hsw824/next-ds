import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChangeEvent, useRef, useState } from 'react';

const Header = () => {
  const router = useRouter();
  const [value, setValue] = useState('');
  const timer = useRef<NodeJS.Timeout | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    const newValue = e.target.value;
    setValue(newValue);

    timer.current = setTimeout(() => {
      router.push(
        {
          pathname: '/search',
          query: newValue.trim() ? { searchQuery: newValue.trim() } : {},
        },
        undefined,
        { shallow: true },
      );
    }, 300);
  };

  const handleFocus = () => {
    router.push({ pathname: '/search', query: value ? { searchQuery: value } : {} });
  };

  return (
    <header className="bg-black text-white h-1/4">
      <Link href="/">왓챠로고</Link>
      메뉴 구독 개별구매 웹툰 왓챠파티 인풋 사용자설정
      <input className="ml-5 text-black" value={value} onChange={handleChange} onFocus={handleFocus} />
    </header>
  );
};

export default Header;
