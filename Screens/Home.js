import React from "react";
import Posts from "./PostsScreen";

import { TubButtonsMenu } from "../TubButtonsMenu";

export default function Home({ navigation }) {
  return (
    <TubButtonsMenu>
      <Posts />
    </TubButtonsMenu>
  );
}
