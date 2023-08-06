import { Container, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const GenericError = () => {
  return (
    <Container maxWidth="md">
      <Stack alignItems="start" gap={2}>
        <Typography variant="h2">Something went wrong :(</Typography>
        <Typography variant="h6">
          We're sorry about that. You can return to the landing page by clicking <Link to="/browser">here</Link>.
        </Typography>
      </Stack>
    </Container>
  )
}

export default GenericError
