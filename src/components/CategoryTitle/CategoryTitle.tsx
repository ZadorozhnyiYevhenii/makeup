import { FC } from "react";
import './CategoryTitle.scss';

type Props = {
  categoryTitle: string | undefined,
}

export const CategoryTitle: FC<Props> = ({
  categoryTitle
}) => {
  return (
    <h1 className="category-title">{categoryTitle}</h1>
  )
}