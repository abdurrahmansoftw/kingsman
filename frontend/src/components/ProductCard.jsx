/* eslint-disable react/prop-types */
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from '@mui/material'

import Rating from './Rating'

import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
  const { _id, name, image, price, description, rating, numReviews } = product
  return (
    <Card component={Stack} spacing={5} sx={{ borderRadius: 2 }}>
      <CardActionArea component={Link} to={`/products/${_id}`}>
        <CardMedia component='img' height='200' image={image} alt={name} />
        <CardContent>
          <Typography gutterBottom variant='h6' component='div'>
            {name}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button size='large' color='primary' variant='text'>
          ${price}
        </Button>
        <Rating value={rating} text={`${numReviews} reviews`} />
      </CardActions>
    </Card>
  )
}

export default ProductCard
