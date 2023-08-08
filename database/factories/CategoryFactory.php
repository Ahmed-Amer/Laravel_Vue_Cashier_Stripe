<?php

namespace Database\Factories;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $name = $this->faker->jobTitle();
        $nameArr = explode(' ' , $name);
        $name = trim($nameArr[0]);
        return [
            'name' => $name,
            'slug' => Str::slug($name),
        ];
    }
}
