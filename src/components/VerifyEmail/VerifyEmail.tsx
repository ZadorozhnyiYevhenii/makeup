import { FC } from "react"
import VerifiedIcon from '@mui/icons-material/Verified';
import { IUser } from "../../types/IUser"

type Props = {
  onVerify: () => Promise<void>
  user: IUser | undefined
}

export const VerifyEmail: FC<Props> = ({
  onVerify,
  user
}) => {
  return (
    <>
      {!user?.isEmailVerified ? (
        <div onClick={onVerify}>Verify your email</div>
      ) : (
        <div>Email verified <VerifiedIcon /></div>
      )}
    </>
  )
}