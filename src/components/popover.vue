<template>
	<!-- <Popover
		:class="[
			'relative z-[3] inline-block text-left font-[Inter]',
			widthFull ? 'w-full':'w-auto'
		]"
	>
		<PopoverButton 
			:class="[
				option && filterType === 'category' ? 'bg-won-green-light' : ' bg-white',
				option ? 'border-won-green' : 'border-won-gray-light',
				'flex h-9 w-full items-center justify-between rounded border px-4'
			]"
		>
			<span class="flex w-full items-center justify-between text-left text-sm font-normal text-won-dark-gray">
				<span
					v-if="filterType === 'sort'"
					class="mr-1"
				> Sort by:</span>

				<span 
					v-if="option"
					class="mr-2 flex items-center font-semibold text-won-green"
				>
					<CheckIcon 
						v-if="filterType === 'category'"
						class="mx-2 size-4 text-won-green"
					/>
					{{ option?.display }}
				</span>
				<span 
					v-else 
					:class="[
						'mr-2 font-normal',
						filterType === 'sort' ? 'font-semibold text-won-green' : 'text-won-dark-gray'
					]"
				>
					{{ filterType === 'sort' ? array[0].display : 'Add category' }}
				</span>
				<ChevronDownIcon class="inline-block size-4" />
			</span>
		</PopoverButton>
		<transition 
			enter-active-class="transition ease-out duration-100"
			enter-from-class="transform opacity-0 scale-95"
			enter-to-class="transform opacity-100 scale-100"
			leave-active-class="transition ease-in duration-75"
			leave-from-class="transform opacity-100 scale-100"
			leave-to-class="transform opacity-0 scale-95"
		>
			<PopoverPanel
				v-slot="{ close }"
				:class="[
					{'right-6' : rightPlacement},
					widthFull ? 'absolute w-full' : 'fixed',
					'mx-auto mt-2 rounded border border-won-gray-light bg-white py-2'
				]"
			>
				<div 
					v-for="item in array"
					:key="item.value"
					class="flex cursor-pointer items-center px-3 py-2 text-sm leading-[140%] hover:bg-won-green-light"
					@click="() => selectCategory(item, close)"
				>
					<CheckIcon 
						v-if="item?.value === option?.value && filterType !== 'request_modal'" 
						class="mr-2 size-4 text-won-green"
					/>
					<span 
						:class="[
							{'ml-6' : item?.value !== option?.value && filterType !== 'request_modal'},
							'mr-5'
						]"
					>
						{{ item.display }}
					</span>
				</div>
			</PopoverPanel>
		</transition>
	</Popover> -->
</template>

<script setup> 
/* import { Popover, PopoverPanel, PopoverButton } from '@headlessui/vue';

import { ChevronDownIcon, CheckIcon } from '@heroicons/vue/24/solid';
import { toRefs } from 'vue';

defineProps({
	rightPlacement: {
		type: Boolean,
		default: false
	},
	widthFull: {
		type: Boolean,
		default: false
	},
});

const passedModel = defineModel();
const { array, option, filterType } = toRefs(passedModel.value);

const selectCategory = (newValue, close) => {
	option.value = newValue;
	close();
}; */
</script>
