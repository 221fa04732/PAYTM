"use client";

import { useBalance } from "../../../../packages/store/src/hooks/useBalance";

export default function Balances() {
  const balance = useBalance();
  return <div>
    Hi there, Your balance is: {balance}
  </div>
}