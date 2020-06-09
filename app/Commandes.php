<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Commandes extends Model
{
    protected $table = "commande";
    public $timestamps = false;
    
    function produit()
    {
        return $this->belongsToMany('App\Produits', 'commande_has_produit', 'id_commande','id_produit');
    }
    /* function users()
    {
        return $this->belongsTo('App\User', 'users_has_commande', 'id_users', 'id_commande');
    }
 */
    function users()
    {
        return $this->belongsTo('App\User', 'id_users');
    }
}
