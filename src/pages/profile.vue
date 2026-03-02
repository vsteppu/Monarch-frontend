<template>
    <div
        class="max-w-4xl mx-auto py-10"
    >
        <div class="flex items-center w-full justify-between">
            <h1
                class="text-3xl font-bbh font-bold"
            >
                About me - Vlad Stepu
            </h1>
            <img src="/public/619651934_17850602718622553_5955958664552008400_n.jpg" alt="" class="rounded-full w-40">
        </div>

        <hr class="my-8 border-gray-200"/>

        <p
            class="text-base leading-relaxed"
        >
            I’m an Interior Designer with experience in both
            interior and graphic design, looking for new opportunities to grow and develop my skills.
            I have professional experience in space planning, 3D visualization in 3ds Max and Corona, and technical documentation in AutoCAD,
            working on projects in Chisinau, Moldova, including roles as <strong>Interior Designer</strong> and <strong>Coordinator of Interior Design Department</strong> at AB and Partners SRL.
        </p>
        <br>
        <p
            class="text-base leading-relaxed"
        >
            Alongside my design background, I’m developing my skills in full-stack web development, working with
            Vue 3 Composition API, Pinia, TailwindCSS, Firebase Authentication and junior backend development with Node.js / Cloudflare Functions.
            I enjoy building interactive user interfaces, managing application state efficiently, and integrating frontend and backend systems to deliver seamless digital experiences.
            I aim to combine my creative design expertise with technical full-stack development skills,
            to contribute to innovative digital projects and craft engaging user experiences.
        </p>

        <hr class="my-8 border-gray-200"/>

        <section>
            <h2
                class="text-2xl font-semibold mb-3 text-gray-800"
            >
                Contact
            </h2>

            <ul
                class="space-y-2 text-gray-700"
            >
                <li>
                    <span class="font-semibold">Email:</span>
                    <a
                        class="text-blue-600 hover:underline ml-2"
                        href="mailto:vladsteppu@gmail.com"
                    >
                        vladsteppu@gmail.com
                    </a>
                </li>

                <li>
                    <span class="font-semibold">Phone:</span>
                    <a
                        class="text-blue-600 hover:underline ml-2"
                        href="tel:+37368056171"
                    >
                        (+373) 68056171
                    </a>
                </li>

                <li>
                    <span class="font-semibold">Social:</span>
                    <a
                        class="text-blue-600 hover:underline ml-2"
                        href="https://www.linkedin.com/in/vlad-%C8%99tepu-3811a4337/"
                    >
                        Linkedin
                    </a>
                    <a
                        class="text-blue-600 hover:underline ml-2"
                        href="https://www.instagram.com/vurado5087/"
                    >
                        Instagram
                    </a>
                </li>

                <li>
                    <span class="font-semibold">Portfolio:</span>
                    <router-link
                        class="text-blue-600 hover:underline ml-2"
                        :to="{ name: 'gallery' }"
                    >
                        Gallery
                    </router-link>
                </li>
            </ul>
        </section>

        <hr class="my-8 border-gray-200"/>
        
        <section>
            <h2
                class="text-2xl font-semibold mb-3 text-gray-800"
            >
                Executed Projects
            </h2>

            <ul
                class="text-blue-600 flex flex-col space-y-2"
            >
                <a
                    class="hover:underline"
                    href="https://www.archilovers.com/projects/284366/divus-restaurant-ab-partners.html#info"
                >
                    DIVUS RESTAURANT
                </a>
                <a
                    class="hover:underline"
                    href="https://archello.com/project/apartment-in-neutral-hues"
                >
                    APARTMENT IN NEUTRAL HUES
                </a>
                <a
                    class="hover:underline"
                    href="https://archello.com/project/pinterest-apartment"
                >
                    APARTMENT IN PINTEREST
                </a>
                <a
                    class="hover:underline"
                    href="https://www.archello.com/project/invitro-diagnostics"
                >
                    INVITRO DIAGNOSTICS
                </a>
            </ul>
        </section>

        <hr class="my-8 border-gray-200"/>

        <section>
            <h2
                class="text-2xl font-semibold mb-3 text-gray-800"
            >
                Recommendation letter
            </h2>
            <a
                class="hover:underline text-blue-600"
                href="https://drive.google.com/file/d/1rhuChlkB5EHdY8ICOIebSimB4XVLaiDs/view?usp=sharing"
            >
                Recommendation letter from Wonsulting
            </a>
        </section>

        <hr class="my-8 border-gray-200"/>

        <section>
            <h2
                class="text-2xl font-semibold mb-3 text-gray-800"
            >
                Skills
            </h2>

            <div
                class="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700"
            >
                <div>
                    <h3
                        class="font-semibold mb-2"
                    >
                        Interior & Graphic Design
                    </h3>

                    <ul
                        class="list-disc list-inside space-y-1"
                    >
                        <li>3ds Max</li>
                        <li>Corona</li>
                        <li>AutoCAD</li>
                        <li>Adobe Photoshop</li>
                        <li>Adobe Illustrator</li>
                    </ul>
                </div>

                <div>
                    <h3
                        class="font-semibold mb-2"
                    >
                        Web & Full-Stack Development
                    </h3>

                    <ul
                        class="list-disc list-inside space-y-1"
                    >
                        <li>Vue 3 Composition API</li>
                        <li>Pinia</li>
                        <li>TailwindCSS</li>
                        <li>Firebase Authentication</li>
                        <li>Node.js / Cloudflare Functions</li>
                    </ul>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>

</script>
