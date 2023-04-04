const AddToCart = () => {
  const ctx = React.useContext(UserContext);
    return(
      <>
        <h1>Add to Cart</h1>
        {JSON.stringify(ctx.items)}
      
      </>

     
    )
  }