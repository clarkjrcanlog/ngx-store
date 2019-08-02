import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NbCardModule, NbStepperModule, NbButtonModule } from '@nebular/theme';

export class SharedModule {
    static forRoot = () => {
        return [
            CommonModule,
            FormsModule,
            NbCardModule,
            NbStepperModule,
            NbButtonModule
        ]
    }
}

