import styles from "./Profile.module.scss";

export function Profile() {
  return (
    <div className={styles.profile}>
      <img className={styles.profile__img} src="/gojo.jpg" alt="User avatar" />
      <div className={styles.profile__info}>
        <h2 className={styles.profile__name}>Alex Legerov</h2>
        <p className={styles.profile__email}>legerov13@gmail.com</p>
      </div>
    </div>
  );
}
