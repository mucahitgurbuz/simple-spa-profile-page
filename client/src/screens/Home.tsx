import { Carousel } from 'antd';
import React from 'react';

const Home: React.SFC<{}> = () => (
  <Carousel autoplay={true}>
    <div>
      <h3>Something cool will happen here!</h3>
    </div>
    <div>
      <h3>Only thing you can't install is brain, for everything else there's npm.</h3>
    </div>
    <div>
      <h3>
        JavaScript makes me want to flip the table and say "Fuck this shit", but I can never be sure what "this" refers
        to.
      </h3>
    </div>
    <div>
      <h3>Why was the JavaScript developer sad? Because he didn’t Node how to Express himself :(</h3>
    </div>
  </Carousel>
);

export default Home;
