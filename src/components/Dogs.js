import React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import { useSelector, useDispatch } from 'react-redux'
import { setBreed } from '../reducer/BreedReducer'
import DogCard from './DogCard'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const modBreed = (listOfBreeds,id) => {
  return Promise.all(
    Object.entries(listOfBreeds).map(async (i) => {
      let img = await fetch(`https://dog.ceo/api/breed/${i[0]}/images/random`, {
          method: "GET",
      })
      .then(res => res.json())
      .then( (imgres) => {
          return imgres.message
      })
      return {
        id: id+i[0],
        name: i[0],
        img,
        liked: 0
      }
    })
  )
}

const Dogs = () => {
  const dispatch = useDispatch()
  const breed = useSelector((state) => state.breed.data)
  const summary = useSelector((state) => state.breed.summary)

  const getBreeds = async () => {
    await fetch(`https://dog.ceo/api/breeds/list/all`, {
        method: "GET",
    })
      .then(res => res.json())
      .then(async (response) => {

          let listOfBreeds = response.message
          let o = await modBreed(listOfBreeds, 1)
          let b = await modBreed(listOfBreeds, 2)

          dispatch(setBreed(o.concat(b)))
      })
  }

  React.useEffect(() => {
    getBreeds()
  // eslint-disable-next-line
  },[]);

  return (
    <Container fixed>
    <Grid container spacing={2} style={{paddingTop: 20}}>
      <Grid item xs={2} style={{border: "1px solid black", padding: 5}}>
        <Grid item xs={12}>
          {summary.map((sum,key) => {
            return <Item key={key} style={{marginBottom:10}}>
              <img src={sum?.img} style={{width:"100%", height:"100%"}} alt={'sum'}/> <br/>
              {sum?.name} <br/>
              Like: {sum?.liked} <br/>
              Count: {sum?.count}
            </Item>
          })}
        </Grid>
      </Grid>
      <Grid item xs={10}>
        <Grid container spacing={2}>
          {breed.map((dog,key) => {
            return <React.Fragment key={key}><DogCard dog={dog}/></React.Fragment>
          })} 
        </Grid>
      </Grid>
    </Grid>
    </Container>
  )
}
export default Dogs;