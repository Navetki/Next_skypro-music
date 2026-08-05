import classNames from 'classnames';
import styles from '../Filter/Filter.module.css';

interface FilterItemProps {
  value: string;
  isActive?: boolean;
}

export default function FilterItem({ value, isActive }: FilterItemProps) {
  return (
    <li
      className={classNames(styles.filterItemText, {
        [styles.filterItemText_active]: isActive,
      })}
    >
      {value}
    </li>
  );
}
