
// Store form data to local storage
export const storeToLocal = ( key: string, value: unknown ) => {
  localStorage.setItem( key, JSON.stringify( value ) );
};

//Get form data from local storage
export const getDataFromLocal = ( key: string ) => {
  const json = localStorage.getItem( key );
  return json ? JSON.parse( json ) : [];
}