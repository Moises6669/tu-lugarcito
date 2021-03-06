import React from "react";
import {
  Header,
  ContainerCards,
  FormContact,
  Footer
} from "../organisms/index";
import { useLoading, useGetData } from "../hook/index";
import { Spinner } from '../atoms/index'
import { generalOptions } from '../../utils/const/sitesFormOpcions'

export default function Home() {
  const { loading } = useLoading();
  const { data} = useGetData('/api/all_restaurant')

  return (
    <div className="home">
      {loading ? (
        <>
          <Header
          btn="Acerca de"
          url="/about-me"
            className="header header-restaurants"
            title="¡Si un día sientes un vacio come es "
            keyword="hambre!"
            content="Un buen vino es como una buena película: dura un instante y te deja en la boca un sabor a gloria; es nuevo en cada sorbo y, como ocurre con las películas, nace y renace en cada saboreador"
          />
          <ContainerCards type="restaurant" data={data} options={generalOptions} />
          <FormContact />
          <Footer />
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
}
