import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { ApolloError } from '@apollo/client';

export const SuccessMessage = ({
  message,
  error
} : {
  message: string,
  error: ApolloError | undefined
}) => {
  return (
    <Alert icon={<CheckIcon fontSize="inherit" />} severity={error ? 'error' : 'success'}>
      {error ? error.message : message}
    </Alert>
  )
}