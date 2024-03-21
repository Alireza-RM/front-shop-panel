"use client";

import { useGetUser } from "@/hooks/useAuth";
import { getUserProfile } from "@/services/authServices";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

function Header() {
  const { data, isPending } = useGetUser();

  const { user, cart } = data || {};

  // console.log({ data, isPending });

  return (
    <header
      className={`shadow-md mb-10 static top-0 transition-all duration-200 ${
        isPending ? "blur-sm opacity-70" : "blur-0 opacity-100"
      }`}
    >
      <nav>
        <ul className="flex items-center justify-between py-2 container xl:max-w-screen-xl">
          <li>
            <Link className="block py-2" href="/">
              خانه
            </Link>
          </li>
          <li>
            <Link className="block py-2" href="/products">
              محصولات
            </Link>
          </li>
          <li>
            <Link className="block py-2" href="/profile">
              پنل کاربر
            </Link>
          </li>
          <li>
            <Link className="block py-2" href="/admin">
              پنل ادمین
            </Link>
          </li>
          <li>
            <Link className="block py-2" href="/cart">
              سبد خرید ({cart ? cart.payDetail.productIds.length : 0})
            </Link>
          </li>
          <li>
            {user ? (
              <span>{user.name}</span>
            ) : (
              <Link className="block py-2" href="/auth">
                ورود
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
