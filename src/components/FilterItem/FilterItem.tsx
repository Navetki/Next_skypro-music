import styles from '../Filter/Filter.module.css';

interface FilterItemProps {
  value: string;
}

export default function FilterItem({ value }: FilterItemProps) {
  return <li className={styles.filterItemText}>{value}</li>;
}
