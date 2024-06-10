import "./listPage.scss";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card";
import Map from "../../components/map/Map";
import { Await, useLoaderData, useParams } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";


function ListPage() {
  const { page } = useParams();
  const [currentPage, setCurrentPage] = useState(page || 1);
  const data = useLoaderData();

  useEffect(() => {
    setCurrentPage(page || 1);
  }, [page]);

  return (
    <div className="grid grid-cols-[1fr_650px] gap-4 lg:gap-2">
      <div className=" relative top-[70px] ">
        <div className="wrapper">
          <Filter />
          <div className="grid grid-cols-2 gap-2 lg:gap-2">
            <Suspense fallback={<p>Loading...</p>}>
              <Await
                resolve={data.postResponse}
                errorElement={<p>Error loading posts!</p>}
              >
                {(postResponse) =>
                  postResponse.data
                    .slice((currentPage - 1) * 10, currentPage * 10)
                    .map((post) => (
                      <Card key={post.id} item={post} />
                    ))
                }
              </Await>
            </Suspense>
          </div>
          <div className="pagination">
            {Array.from({ length: Math.ceil(data.total / 10) }, (_, i) => i + 1).map((pageNumber) => (
              <button key={pageNumber} onClick={() => setCurrentPage(pageNumber)} className={currentPage === pageNumber ? "active" : ""}>
                {pageNumber}
             dsdf </button>
            ))}
          </div>
        </div>
      </div>
      <div className="!sticky top-[70px] left-0 h-screen ">
        <Suspense fallback={<p>Loading...</p>}>
          <Await
            resolve={data.postResponse}
            errorElement={<p>Error loading posts!</p>}
          >
            {(postResponse) => <Map items={postResponse.data} />}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}

export default ListPage;