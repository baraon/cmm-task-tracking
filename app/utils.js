let external = module.exports = {}

/**
 * Performs a promise.all and unifies the returned data into a singular array instead of an array of arrays.
 * @param {Array} promises - An array of promises to resolve and unify.
 * @returns {Promise<Array | never>}
 */
external.unify = ( promises ) => {
    return Promise.all( promises ).then( ( results ) => {
        let unified = []
        results.forEach( ( parts ) => {
            if( Array.isArray( parts ) )
                unified = unified.concat( parts )
            else
                unified.push( parts )
        })

        return Promise.resolve( unified )
    }).catch( ( error ) => {
        console.error( 'Unification error.', error )
        return Promise.reject( error )
    })
}
