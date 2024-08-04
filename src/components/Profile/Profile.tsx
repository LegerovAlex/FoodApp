import { useDispatch, useSelector } from "react-redux";
import styles from "./Profile.module.scss";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import { getProfile } from "../../store/user.slice";

export function Profile() {
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((state: RootState) => state.user.profile);
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <div className={styles.profile}>
      <img className={styles.profile__img} src="/gojo.jpg" alt="User avatar" />
      <div className={styles.profile__info}>
        <h2 className={styles.profile__name}>{profile?.name}</h2>
        <p className={styles.profile__email}>{profile?.email}</p>
      </div>
    </div>
  );
}
