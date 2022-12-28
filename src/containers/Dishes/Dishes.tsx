import React from 'react';
import {Link} from "react-router-dom";

const Dishes = () => {
  return (
    <div>
      <div className='d-flex justify-content-between'>
        Dishes
        <Link to='new-dish' className='btn btn-outline-danger'>Add new Dish</Link>
      </div>
      <p><span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ad
        adipisci cumque doloribus enim esse fugiat inventore, magni nam, necessitatibus nihil nisi
        odio quae qui quia quisquam, quod repudiandae voluptas!</span><span>Architecto cum debitis
        deleniti dignissimos dolor doloremque ducimus error facere fuga id inventore iste iusto laborum
        maiores quae sint unde ut, vel! Consectetur delectus dignissimos modi natus quos sapiente,
        tempore temporibus vero voluptas voluptate!</span><span>Aperiam autem earum hic iure rerum.
        Culpa delectus libero natus nulla. A assumenda dignissimos dolore ducimus eius enim est in
        magni molestias, natus nisi placeat praesentium quasi quo, recusandae rem.</span><span>Architecto
        autem dignissimos, dolore enim eos et eveniet fugiat magni modi nihil quo repudiandae rerum ut.
        Aspernatur assumenda dolores eos fuga incidunt ipsa nisi nulla porro sequi tenetur. Dignissimos,
        dignissimos enim fugiat, iste maxime, molestiae nesciunt omnis quia sint suscipit tenetur. Exercitationem
        impedit,laborum mollitia repellat sint sunt tempore.</span><span>Adipisci aspernatur, commodi corporis
        dicta distinctioeligendi est eveniet facere illo iste itaque laborum molestias natus nisi non possimus
        quam quo ratione reprehenderit sequi suscipit, tempore vitae voluptatem! Facere, nam.</span><span>A
        animi cupiditate dolores dolorum earum enim facere in, inventore ipsum neque obcaecati placeat ratione
        recusandae rerum saepe ullam voluptatibus? Animi et molestias quo saepe sequi suscipit veritatis?
        Deserunt, ex?</span></p>
    </div>
  );
};

export default Dishes;