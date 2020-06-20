<?php

use App\Fruits;
use App\Producteurs;
use App\Produits;
use App\Recompenses;
use Illuminate\Database\Seeder;

class ProducteurSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Producteurs::class, 8)->create()
            ->each(function($t){
                $t->produit()->saveMany(
                    factory(Produits::class,1)->make()
                )
                    ->each(function($a){
                        $a->recompenses()->saveMany(factory(Recompenses::class,1)->make());
                    })
                    ->each(function($n){
                        $n->fruits()->saveMany(factory(Fruits::class,2)->make());
                    });
        
            });   
    }
}
