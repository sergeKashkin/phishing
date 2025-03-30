import { useEffect } from "react";
import { redirect } from "react-router";

export function Welcome() {
  useEffect(() => {redirect('login')}, [])

  return 'welcome';
}
